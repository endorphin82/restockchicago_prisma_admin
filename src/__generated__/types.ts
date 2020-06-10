export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  skip?: Maybe<Scalars['Int']>;
};


export type CategoryImagesArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type CategoryCreateInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  icon: Scalars['String'];
  products?: Maybe<ProductCreateManyWithoutCategoryInput>;
  images?: Maybe<ImageCatCreateManyWithoutCategoryInput>;
};

export type CategoryCreateOneWithoutProductsInput = {
  create?: Maybe<CategoryCreateWithoutProductsInput>;
  connect?: Maybe<CategoryWhereUniqueInput>;
};

export type CategoryCreateWithoutProductsInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  icon: Scalars['String'];
  images?: Maybe<ImageCatCreateManyWithoutCategoryInput>;
};

export type CategoryUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  products?: Maybe<ProductUpdateManyWithoutCategoryInput>;
  images?: Maybe<ImageCatUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateOneWithoutProductsInput = {
  create?: Maybe<CategoryCreateWithoutProductsInput>;
  connect?: Maybe<CategoryWhereUniqueInput>;
  disconnect?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CategoryUpdateWithoutProductsDataInput>;
  upsert?: Maybe<CategoryUpsertWithoutProductsInput>;
};

export type CategoryUpdateWithoutProductsDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  images?: Maybe<ImageCatUpdateManyWithoutCategoryInput>;
};

export type CategoryUpsertWithoutProductsInput = {
  update: CategoryUpdateWithoutProductsDataInput;
  create: CategoryCreateWithoutProductsInput;
};

export type CategoryWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  description?: Maybe<NullableStringFilter>;
  parent?: Maybe<NullableIntFilter>;
  products?: Maybe<ProductFilter>;
  images?: Maybe<ImageCatFilter>;
  icon?: Maybe<StringFilter>;
  AND?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

export type ImageCat = {
  __typename?: 'ImageCat';
  id: Scalars['Int'];
  url: Scalars['String'];
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
  id?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  category_id?: Maybe<NullableIntFilter>;
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
  id?: Maybe<IntFilter>;
  url?: Maybe<StringFilter>;
  category_id?: Maybe<NullableIntFilter>;
  AND?: Maybe<Array<ImageCatWhereInput>>;
  OR?: Maybe<Array<ImageCatWhereInput>>;
  NOT?: Maybe<Array<ImageCatWhereInput>>;
  category?: Maybe<CategoryWhereInput>;
};

export type ImageCatWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  category_id?: Maybe<Scalars['Int']>;
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
  url?: Maybe<StringFilter>;
  product_id?: Maybe<NullableIntFilter>;
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
  url?: Maybe<StringFilter>;
  product_id?: Maybe<NullableIntFilter>;
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
  createOneProduct: Product;
  updateOneProduct?: Maybe<Product>;
  deleteOneProduct?: Maybe<Product>;
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


export type MutationCreateOneProductArgs = {
  data: ProductCreateInput;
};


export type MutationUpdateOneProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
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
  category?: Maybe<Category>;
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  category_id?: Maybe<Scalars['Int']>;
  price: Scalars['Int'];
  images: Array<ImageProd>;
};


export type ProductImagesArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type ProductCreateInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  icon: Scalars['String'];
  category?: Maybe<CategoryCreateOneWithoutProductsInput>;
  images?: Maybe<ImageProdCreateManyWithoutProductInput>;
};

export type ProductCreateManyWithoutCategoryInput = {
  create?: Maybe<Array<ProductCreateWithoutCategoryInput>>;
  connect?: Maybe<Array<ProductWhereUniqueInput>>;
};

export type ProductCreateWithoutCategoryInput = {
  name: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  icon: Scalars['String'];
  images?: Maybe<ImageProdCreateManyWithoutProductInput>;
};

export type ProductFilter = {
  every?: Maybe<ProductWhereInput>;
  some?: Maybe<ProductWhereInput>;
  none?: Maybe<ProductWhereInput>;
};

export type ProductScalarWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  description?: Maybe<NullableStringFilter>;
  category_id?: Maybe<NullableIntFilter>;
  price?: Maybe<IntFilter>;
  images?: Maybe<ImageProdFilter>;
  icon?: Maybe<StringFilter>;
  AND?: Maybe<Array<ProductScalarWhereInput>>;
  OR?: Maybe<Array<ProductScalarWhereInput>>;
  NOT?: Maybe<Array<ProductScalarWhereInput>>;
};

export type ProductUpdateInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  category?: Maybe<CategoryUpdateOneWithoutProductsInput>;
  images?: Maybe<ImageProdUpdateManyWithoutProductInput>;
};

export type ProductUpdateManyDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
};

export type ProductUpdateManyWithoutCategoryInput = {
  create?: Maybe<Array<ProductCreateWithoutCategoryInput>>;
  connect?: Maybe<Array<ProductWhereUniqueInput>>;
  set?: Maybe<Array<ProductWhereUniqueInput>>;
  disconnect?: Maybe<Array<ProductWhereUniqueInput>>;
  delete?: Maybe<Array<ProductWhereUniqueInput>>;
  update?: Maybe<Array<ProductUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: Maybe<Array<ProductUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<ProductScalarWhereInput>>;
  upsert?: Maybe<Array<ProductUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type ProductUpdateManyWithWhereNestedInput = {
  where: ProductScalarWhereInput;
  data: ProductUpdateManyDataInput;
};

export type ProductUpdateWithoutCategoryDataInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
  images?: Maybe<ImageProdUpdateManyWithoutProductInput>;
};

export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
  where: ProductWhereUniqueInput;
  data: ProductUpdateWithoutCategoryDataInput;
};

export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
  where: ProductWhereUniqueInput;
  update: ProductUpdateWithoutCategoryDataInput;
  create: ProductCreateWithoutCategoryInput;
};

export type ProductWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  url?: Maybe<StringFilter>;
  description?: Maybe<NullableStringFilter>;
  category_id?: Maybe<NullableIntFilter>;
  price?: Maybe<IntFilter>;
  images?: Maybe<ImageProdFilter>;
  icon?: Maybe<StringFilter>;
  AND?: Maybe<Array<ProductWhereInput>>;
  OR?: Maybe<Array<ProductWhereInput>>;
  NOT?: Maybe<Array<ProductWhereInput>>;
  category?: Maybe<CategoryWhereInput>;
};

export type ProductWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  category_id?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
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
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCategoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};


export type QueryProductsArgs = {
  skip?: Maybe<Scalars['Int']>;
};


export type QueryProductByNameArgs = {
  name: Scalars['String'];
};


export type QueryCategoryByNameArgs = {
  name: Scalars['String'];
};


export type QueryProductsByNameAndCategoryIdArgs = {
  name: Scalars['String'];
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
