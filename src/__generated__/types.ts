export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  products: Array<Product>;
  icon: Scalars['String'];
  images: Array<ImageCat>;
};


export type CategoryProductsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProductWhereUniqueInput>;
  after?: Maybe<ProductWhereUniqueInput>;
};


export type CategoryImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ImageCatWhereUniqueInput>;
  after?: Maybe<ImageCatWhereUniqueInput>;
};

export type CategoryCreateInput = {
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  images?: Maybe<ImageCatCreateManyWithoutCategoryInput>;
  products?: Maybe<ProductCreateManyWithoutCategoriesInput>;
};

export type CategoryCreateManyWithoutProductsInput = {
  create?: Maybe<Array<CategoryCreateWithoutProductsInput>>;
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryCreateWithoutProductsInput = {
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  images?: Maybe<ImageCatCreateManyWithoutCategoryInput>;
};

export type CategoryFilter = {
  every?: Maybe<CategoryWhereInput>;
  some?: Maybe<CategoryWhereInput>;
  none?: Maybe<CategoryWhereInput>;
};

export type CategoryScalarWhereInput = {
  description?: Maybe<NullableStringFilter>;
  icon?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  parent?: Maybe<NullableIntFilter>;
  url?: Maybe<StringFilter>;
  images?: Maybe<ImageCatFilter>;
  products?: Maybe<ProductFilter>;
  AND?: Maybe<Array<CategoryScalarWhereInput>>;
  OR?: Maybe<Array<CategoryScalarWhereInput>>;
  NOT?: Maybe<Array<CategoryScalarWhereInput>>;
};

export type CategoryUpdateInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  images?: Maybe<ImageCatUpdateManyWithoutCategoryInput>;
  products?: Maybe<ProductUpdateManyWithoutCategoriesInput>;
};

export type CategoryUpdateManyDataInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type CategoryUpdateManyWithoutProductsInput = {
  create?: Maybe<Array<CategoryCreateWithoutProductsInput>>;
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
  set?: Maybe<Array<CategoryWhereUniqueInput>>;
  disconnect?: Maybe<Array<CategoryWhereUniqueInput>>;
  delete?: Maybe<Array<CategoryWhereUniqueInput>>;
  update?: Maybe<Array<CategoryUpdateWithWhereUniqueWithoutProductsInput>>;
  updateMany?: Maybe<Array<CategoryUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<CategoryScalarWhereInput>>;
  upsert?: Maybe<Array<CategoryUpsertWithWhereUniqueWithoutProductsInput>>;
};

export type CategoryUpdateManyWithWhereNestedInput = {
  where: CategoryScalarWhereInput;
  data: CategoryUpdateManyDataInput;
};

export type CategoryUpdateWithoutProductsDataInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  images?: Maybe<ImageCatUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithWhereUniqueWithoutProductsInput = {
  where: CategoryWhereUniqueInput;
  data: CategoryUpdateWithoutProductsDataInput;
};

export type CategoryUpsertWithWhereUniqueWithoutProductsInput = {
  where: CategoryWhereUniqueInput;
  update: CategoryUpdateWithoutProductsDataInput;
  create: CategoryCreateWithoutProductsInput;
};

export type CategoryWhereInput = {
  description?: Maybe<NullableStringFilter>;
  icon?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  parent?: Maybe<NullableIntFilter>;
  url?: Maybe<StringFilter>;
  images?: Maybe<ImageCatFilter>;
  products?: Maybe<ProductFilter>;
  AND?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  uid: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  url: Scalars['String'];
};

export type ImageCat = {
  __typename?: 'ImageCat';
  id: Scalars['Int'];
  url: Scalars['String'];
  category?: Maybe<Category>;
  category_id?: Maybe<Scalars['Int']>;
};

export type ImageCatCreateManyWithoutCategoryInput = {
  create?: Maybe<Array<ImageCatCreateWithoutCategoryInput>>;
  connect?: Maybe<Array<ImageCatWhereUniqueInput>>;
};

export type ImageCatCreateWithoutCategoryInput = {
  url: Scalars['String'];
};

export type ImageCatFilter = {
  every?: Maybe<ImageCatWhereInput>;
  some?: Maybe<ImageCatWhereInput>;
  none?: Maybe<ImageCatWhereInput>;
};

export type ImageCatScalarWhereInput = {
  category_id?: Maybe<NullableIntFilter>;
  id?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  AND?: Maybe<Array<ImageCatScalarWhereInput>>;
  OR?: Maybe<Array<ImageCatScalarWhereInput>>;
  NOT?: Maybe<Array<ImageCatScalarWhereInput>>;
};

export type ImageCatUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ImageCatUpdateManyWithoutCategoryInput = {
  create?: Maybe<Array<ImageCatCreateWithoutCategoryInput>>;
  connect?: Maybe<Array<ImageCatWhereUniqueInput>>;
  set?: Maybe<Array<ImageCatWhereUniqueInput>>;
  disconnect?: Maybe<Array<ImageCatWhereUniqueInput>>;
  delete?: Maybe<Array<ImageCatWhereUniqueInput>>;
  update?: Maybe<Array<ImageCatUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: Maybe<Array<ImageCatUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ImageCatScalarWhereInput>>;
  upsert?: Maybe<Array<ImageCatUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type ImageCatUpdateManyWithWhereNestedInput = {
  where: ImageCatScalarWhereInput;
  data: ImageCatUpdateManyDataInput;
};

export type ImageCatUpdateWithoutCategoryDataInput = {
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ImageCatUpdateWithWhereUniqueWithoutCategoryInput = {
  where: ImageCatWhereUniqueInput;
  data: ImageCatUpdateWithoutCategoryDataInput;
};

export type ImageCatUpsertWithWhereUniqueWithoutCategoryInput = {
  where: ImageCatWhereUniqueInput;
  update: ImageCatUpdateWithoutCategoryDataInput;
  create: ImageCatCreateWithoutCategoryInput;
};

export type ImageCatWhereInput = {
  category_id?: Maybe<NullableIntFilter>;
  id?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  AND?: Maybe<Array<ImageCatWhereInput>>;
  OR?: Maybe<Array<ImageCatWhereInput>>;
  NOT?: Maybe<Array<ImageCatWhereInput>>;
  category?: Maybe<CategoryWhereInput>;
};

export type ImageCatWhereUniqueInput = {
  category_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type ImageProd = {
  __typename?: 'ImageProd';
  id: Scalars['Int'];
  product?: Maybe<Product>;
  url: Scalars['String'];
  product_id?: Maybe<Scalars['Int']>;
};

export type ImageProdCreateManyWithoutProductInput = {
  create?: Maybe<Array<ImageProdCreateWithoutProductInput>>;
  connect?: Maybe<Array<ImageProdWhereUniqueInput>>;
};

export type ImageProdCreateWithoutProductInput = {
  url: Scalars['String'];
};

export type ImageProdFilter = {
  every?: Maybe<ImageProdWhereInput>;
  some?: Maybe<ImageProdWhereInput>;
  none?: Maybe<ImageProdWhereInput>;
};

export type ImageProdScalarWhereInput = {
  id?: Maybe<IntFilter>;
  product_id?: Maybe<NullableIntFilter>;
  url?: Maybe<StringFilter>;
  AND?: Maybe<Array<ImageProdScalarWhereInput>>;
  OR?: Maybe<Array<ImageProdScalarWhereInput>>;
  NOT?: Maybe<Array<ImageProdScalarWhereInput>>;
};

export type ImageProdUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ImageProdUpdateManyWithoutProductInput = {
  create?: Maybe<Array<ImageProdCreateWithoutProductInput>>;
  connect?: Maybe<Array<ImageProdWhereUniqueInput>>;
  set?: Maybe<Array<ImageProdWhereUniqueInput>>;
  disconnect?: Maybe<Array<ImageProdWhereUniqueInput>>;
  delete?: Maybe<Array<ImageProdWhereUniqueInput>>;
  update?: Maybe<Array<ImageProdUpdateWithWhereUniqueWithoutProductInput>>;
  updateMany?: Maybe<Array<ImageProdUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ImageProdScalarWhereInput>>;
  upsert?: Maybe<Array<ImageProdUpsertWithWhereUniqueWithoutProductInput>>;
};

export type ImageProdUpdateManyWithWhereNestedInput = {
  where: ImageProdScalarWhereInput;
  data: ImageProdUpdateManyDataInput;
};

export type ImageProdUpdateWithoutProductDataInput = {
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ImageProdUpdateWithWhereUniqueWithoutProductInput = {
  where: ImageProdWhereUniqueInput;
  data: ImageProdUpdateWithoutProductDataInput;
};

export type ImageProdUpsertWithWhereUniqueWithoutProductInput = {
  where: ImageProdWhereUniqueInput;
  update: ImageProdUpdateWithoutProductDataInput;
  create: ImageProdCreateWithoutProductInput;
};

export type ImageProdWhereInput = {
  id?: Maybe<IntFilter>;
  product_id?: Maybe<NullableIntFilter>;
  url?: Maybe<StringFilter>;
  AND?: Maybe<Array<ImageProdWhereInput>>;
  OR?: Maybe<Array<ImageProdWhereInput>>;
  NOT?: Maybe<Array<ImageProdWhereInput>>;
  product?: Maybe<ProductWhereInput>;
};

export type ImageProdWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneCategory: Category;
  updateOneCategory?: Maybe<Category>;
  deleteOneCategory?: Maybe<Category>;
  _createOneProduct: Product;
  updateOneProduct?: Maybe<Product>;
  _deleteOneProduct?: Maybe<Product>;
  createOneProduct: Product;
  deleteOneProduct: Product;
};


export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type Mutation_CreateOneProductArgs = {
  data: ProductCreateInput;
};


export type MutationUpdateOneProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};


export type Mutation_DeleteOneProductArgs = {
  where: ProductWhereUniqueInput;
};


export type MutationCreateOneProductArgs = {
  data: ProductCreateInput;
  files?: Maybe<Array<Scalars['Upload']>>;
};


export type MutationDeleteOneProductArgs = {
  where: ProductWhereUniqueInput;
};

export type NullableIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int'];
  name: Scalars['String'];
  categories: Array<Category>;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  price: Scalars['Int'];
  images: Array<ImageProd>;
  img?: Maybe<Scalars['String']>;
};


export type ProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CategoryWhereUniqueInput>;
  after?: Maybe<CategoryWhereUniqueInput>;
};


export type ProductImagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ImageProdWhereUniqueInput>;
  after?: Maybe<ImageProdWhereUniqueInput>;
};

export type ProductCreateInput = {
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  url: Scalars['String'];
  images?: Maybe<ImageProdCreateManyWithoutProductInput>;
  categories?: Maybe<CategoryCreateManyWithoutProductsInput>;
};

export type ProductCreateManyWithoutCategoriesInput = {
  create?: Maybe<Array<ProductCreateWithoutCategoriesInput>>;
  connect?: Maybe<Array<ProductWhereUniqueInput>>;
};

export type ProductCreateWithoutCategoriesInput = {
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  url: Scalars['String'];
  images?: Maybe<ImageProdCreateManyWithoutProductInput>;
};

export type ProductFilter = {
  every?: Maybe<ProductWhereInput>;
  some?: Maybe<ProductWhereInput>;
  none?: Maybe<ProductWhereInput>;
};

export type ProductScalarWhereInput = {
  description?: Maybe<NullableStringFilter>;
  icon?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  img?: Maybe<NullableStringFilter>;
  name?: Maybe<StringFilter>;
  price?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  images?: Maybe<ImageProdFilter>;
  categories?: Maybe<CategoryFilter>;
  AND?: Maybe<Array<ProductScalarWhereInput>>;
  OR?: Maybe<Array<ProductScalarWhereInput>>;
  NOT?: Maybe<Array<ProductScalarWhereInput>>;
};

export type ProductUpdateInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  images?: Maybe<ImageProdUpdateManyWithoutProductInput>;
  categories?: Maybe<CategoryUpdateManyWithoutProductsInput>;
};

export type ProductUpdateManyDataInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ProductUpdateManyWithoutCategoriesInput = {
  create?: Maybe<Array<ProductCreateWithoutCategoriesInput>>;
  connect?: Maybe<Array<ProductWhereUniqueInput>>;
  set?: Maybe<Array<ProductWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProductWhereUniqueInput>>;
  delete?: Maybe<Array<ProductWhereUniqueInput>>;
  update?: Maybe<Array<ProductUpdateWithWhereUniqueWithoutCategoriesInput>>;
  updateMany?: Maybe<Array<ProductUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ProductScalarWhereInput>>;
  upsert?: Maybe<Array<ProductUpsertWithWhereUniqueWithoutCategoriesInput>>;
};

export type ProductUpdateManyWithWhereNestedInput = {
  where: ProductScalarWhereInput;
  data: ProductUpdateManyDataInput;
};

export type ProductUpdateWithoutCategoriesDataInput = {
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  img?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  images?: Maybe<ImageProdUpdateManyWithoutProductInput>;
};

export type ProductUpdateWithWhereUniqueWithoutCategoriesInput = {
  where: ProductWhereUniqueInput;
  data: ProductUpdateWithoutCategoriesDataInput;
};

export type ProductUpsertWithWhereUniqueWithoutCategoriesInput = {
  where: ProductWhereUniqueInput;
  update: ProductUpdateWithoutCategoriesDataInput;
  create: ProductCreateWithoutCategoriesInput;
};

export type ProductWhereInput = {
  description?: Maybe<NullableStringFilter>;
  icon?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  img?: Maybe<NullableStringFilter>;
  name?: Maybe<StringFilter>;
  price?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  images?: Maybe<ImageProdFilter>;
  categories?: Maybe<CategoryFilter>;
  AND?: Maybe<Array<ProductWhereInput>>;
  OR?: Maybe<Array<ProductWhereInput>>;
  NOT?: Maybe<Array<ProductWhereInput>>;
};

export type ProductWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  category?: Maybe<Category>;
  categories: Array<Category>;
  product?: Maybe<Product>;
  products: Array<Product>;
  productByName: Product;
  categoryByName: Category;
  productsByNameAndCategoryId: Array<Product>;
  productsByNameAndCategoryIds: Array<Product>;
  productsByCategoryId: Array<Product>;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCategoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<CategoryWhereUniqueInput>;
  after?: Maybe<CategoryWhereUniqueInput>;
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<ProductWhereUniqueInput>;
  after?: Maybe<ProductWhereUniqueInput>;
};


export type QueryProductByNameArgs = {
  name: Scalars['String'];
};


export type QueryCategoryByNameArgs = {
  name: Scalars['String'];
};


export type QueryProductsByNameAndCategoryIdArgs = {
  name: Scalars['String'];
  category_id?: Maybe<Scalars['Int']>;
};


export type QueryProductsByNameAndCategoryIdsArgs = {
  name: Scalars['String'];
  category_ids?: Maybe<Array<Scalars['Int']>>;
};


export type QueryProductsByCategoryIdArgs = {
  category_id: Scalars['Int'];
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

