import { Component, inject, OnInit, signal } from '@angular/core';
import { FormUiComponent } from '@mercatura/ui';
import { FormConfig } from '@mercatura/ui';
import { BASIC_FORM } from './form-config/BASIC_FORM';
import { ProductManagementService } from '@mercatura/shop/data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateProductRequest, SellerProductVariant } from '@mercatura/models';
import { FormSelectOption } from '@mercatura/ui';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  imports: [FormUiComponent, RouterLink, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private readonly productSvc = inject(ProductManagementService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isEdit = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly saving = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // --- Basic info form ------------------------------
  private basicValues: Record<string , any> = {};

  // --- Basic info form ------------------------------
  readonly basicForm = signal<FormConfig>({ ...BASIC_FORM, fields: BASIC_FORM.fields.map((field) => {
      if (field.id === 'name') field['onValueChange'] = v => this.basicValues['name'] = v;
      if (field.id === 'description') field['onValueChange'] = v => this.basicValues['description'] = v;
      if (field.id === 'category_id') field['onValueChange'] = v => this.basicValues['category_id'] = v;
      return {...field};
    })
  });

  // --- Variants ------------------------------   
  variants: Partial<SellerProductVariant>[] = [
    { sku: '', price: '0.00', stock_quantity: 0, attributes: [], },
  ];

  getVariantForm(index: number): FormConfig {
    const V: Partial<SellerProductVariant> = 
      this.variants[index];
    return {
      fields: [
        {
          id: `sku-${index}`, type: 'text',
          label: 'SKU', placeholder: 'PROD-001',
          required: true, value: V.sku,
          onValueChange: v => this.variants[index].sku = v,
        },
        {
          id: `price-${index}`, type: 'number',
          label: 'Price', placeholder: '0.00',
          required: true, value: V.price,
          onValueChange: v => this.variants[index].price = v,
        },
        {
          id: `stock-${index}`, type: 'number',
          label: 'Stock', placeholder: '0',
          required: true, value: V.stock_quantity,
          onValueChange: v => 
            this.variants[index].stock_quantity = Number(v),
        },
      ],
      columns: 2,
    };
  }

  private productId?: number;

  ngOnInit(): void {
    this._loadCategories();
    const ID: string = 
      this.route.snapshot.paramMap.get('id')!;
    if (ID) {
      this.isEdit.set(true);
      this.productId = Number(ID);
      this._loadProduct(this.productId);
    }
  }

  private _loadCategories(): void {
    this.productSvc.getCategories().subscribe({
      next: res => {
        const OPTIONS: FormSelectOption[] = 
          res.categories.filter(c => c.status === 'approved')
          .map(c => ({ label: c.name, value: c.id, }));

        // update category field options
        this.basicForm.update(config => ({
          ...config,
          fields: config.fields.map(f => 
            f.id === 'category_id' 
              ? {...f, options: OPTIONS} 
              : f 
          )
        }));
      },
    });
  }

  private _loadProduct(id: number): void {
    this.loading.set(true);
    this.productSvc.getProductById(id).subscribe({
      next: product => {
        this.basicValues = {
          name: product.name,
          description: product.description,
          category_id: product.category_id,
        };
        // pre-fill form values
        this.basicForm.update(config => ({
          ...config,
          fields: config.fields.map(f => ({
            ...f,
            value: this.basicValues[f.id] ?? f.value,
          }))
        }));
        this.variants = product.variants.length 
          ? product.variants 
          : [{ 
              sku: '', price: '0.00', 
              stock_quantity: 0, attributes: [], 
          }]; 
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Product not found.');
        this.loading.set(false);
      },
    });
  }

  addVariant(): void {
    this.variants = [
      ...this.variants,
      { 
        sku: '', price: '0.00', 
        stock_quantity: 0, attributes: [], 
      },
    ];
  }

  removeVariant(index: number): void {
    if (this.variants.length === 1) return;
    this.variants = this.variants.filter((_, i) => i !== index);
  }

  addAttribute(i: number): void {
    this.variants[i].attributes = [
      ...(this.variants[i].attributes ?? []),
      { name: '', value: '' }
    ];
  }

  removeAttribute(i: number, j: number): void {
    this.variants[i].attributes = 
      this.variants[i].attributes!.filter((_, k) => k !== j);
  }

  onSubmit(): void {
    if (!this.basicValues['name'] || !this.basicValues['category_id']) {
      this.error.set('Please fill all required fields.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const PAYLOAD: CreateProductRequest = {
      name: this.basicValues['name'],
      description: this.basicValues['description'],
      category_id: this.basicValues['category_id'],
      variants: this.variants.map(v => ({
        sku: v.sku ?? '',
        price: v.price ?? '0.00',
        stock_quantity: v.stock_quantity ?? 0,
        attributes: v.attributes ?? [],
      }))
    };

    const REQUEST$ = this.isEdit()
      ? this.productSvc.updateProduct(this.productId!, PAYLOAD) 
      : this.productSvc.createProduct(PAYLOAD);
    
    REQUEST$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        this.saving.set(false);
        const ERRORS: any = err.error?.errors;
        if (ERRORS) {
          const FIRST: string[] = 
            Object.values(ERRORS)[0] as string[];
            this.error.set(FIRST[0]);
        } else {
          this.error.set('Failed to save product.');
        }
      },
    });
  }
}
