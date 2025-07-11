const { query } = require(".");

module.exports = {
  //todo 목록
  todoList: {
    query: `select * from t_todo`,
  },
  //todo 삭제
  todoDelete: {
    query: `delete from t_todo where id = ?`,
  },
  //상품목록
  productList: {
    query: `SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3
    FROM t_product t1
    JOIN t_image t2 ON t1.id = t2.product_id AND t2.type = 1
    JOIN t_category t3 ON t1.category_id = t3.id`,
  },
  productList2: {
    query: `    SELECT t3.*, t4.path 
    FROM (
      SELECT t1.*, t2.category1, t2.category2, t2.category3
      FROM t_product t1, t_category t2
      WHERE t1.category_id = t2.id
    ) t3
    LEFT JOIN (
      SELECT * FROM t_image WHERE type = 1
    ) t4
    ON t3.id = t4.product_id
  `,
  },
  productDetail: {
    query: `
  SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3, t2.type
            FROM t_product t1
            LEFT OUTER JOIN t_image t2 ON t1.id = t2.product_id AND t2.type in (1, 3)
            LEFT OUTER JOIN t_category t3 ON t1.category_id = t3.id
            WHERE t1.id = ?
            ORDER BY t2.type DESC
            LIMIT 1
  `,
  },

  productMainImages: {
    query: `select * from t_image where product_id = ? and type =2`,
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
    query: `delete from t_image where id=?`,
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
