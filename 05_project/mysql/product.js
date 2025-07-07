const { query } = require(".");

module.exports = {
  productList: {
    query: `SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3
    FROM t_product t1
    JOIN t_image t2 ON t1.id = t2.product_id AND t2.type = 1
    JOIN t_category t3 ON t1.category_id = t3.id`,
  },
  productList2: {
    query: `select t3.*, t4.path from (select t1.* t2.category1, t2category2, t2category3
    from t_product t1, t_category t2
    where t1.category_id =t2.id) t3
    left join (select *from t_iamge where type=1)t4
    on t3.id =t4 droduct_id`,
  },
  productDetail: {
    query: `
    SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3
    FROM t_product t1, t_image t2, t_category t3
    WHERE t1.id = ? 
      AND t1.id = t2.product_id 
      AND t2.type = 1 
      AND t1.category_id = t3.id
  `,
  },

  productMainImages: {
    query: `select * from t_iamge where product_id = ? and type =2`,
  },
  productInsert: {
    query: `insert into t_product set ?`,
  },
  productImageInsert: {
    query: `insert into t_image set ?`,
  },
  imageList: {
    query: `select * from t_image where product_id=?`,
  },
  imageDelete: {
    query: `delete from t_product where id=?`,
  },
  categoryList: {
    query: `SELECT * FROM t_category;`,
  },
  categoryInsert: {
    query: `insert into t_category set ?`,
  },
  sellerList: {
    query: `select * from t_seller`,
  },
  singUp: {
    query: `insert into t_user set ? on duplicate key update ?`,
  },
  //상품삭제
  productDelete: {
    query: `delete form t_product where id =?`,
  },
  //
};
