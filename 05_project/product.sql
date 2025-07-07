drop table if exists t_category;

CREATE TABLE t_category (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    category1 VARCHAR(100) NOT NULL DEFAULT '',
    category2 VARCHAR(100) NOT NULL DEFAULT '',
    category3 VARCHAR(100) DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

drop table if exists tcustomers_image;

CREATE TABLE t_iamge (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT(11) UNSIGNED NOT NULL,
    type INT(1) NOT NULL DEFAULT 1 COMMENT '1-썸네일, 2-제품이미지, 3-제품설명이미지',
    path VARCHAR(150) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    KEY product_id (product_id),
    CONSTRAINT t_image_ibfk_1 FOREIGN KEY (product_id)
        REFERENCES t_product (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

drop table if exists t_product;
  
  ALTER TABLE t_product
CHANGE delivery_pricecustomers delivery_price int(11);
  
CREATE TABLE t_product (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL DEFAULT '',
    product_price INT(11) NOT NULL DEFAULT 0,
    delivery_price INT(11) NOT NULL DEFAULT 0,
    add_delivery_price INT(11) NOT NULL DEFAULT 0,
    tags VARCHAR(100) DEFAULT NULL,
    outbound_days INT(2) NOT NULL DEFAULT 5,
    seller_id INT(11) UNSIGNED NOT NULL DEFAULT 0,
    category_id INT(11) UNSIGNED NOT NULL DEFAULT 0,
    acive_yn ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP (),
    PRIMARY KEY (id),
    KEY seller_id (seller_id),
    KEY category_id (category_id),
    CONSTRAINT t_product_ibfk_1 FOREIGN KEY (seller_id)
        REFERENCES t_seller (id),
    CONSTRAINT t_product_ibfk_2 FOREIGN KEY (category_id)
        REFERENCES t_category (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

drop table if exists t_seller;

CREATE TABLE t_seller (
    id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    phone VARCHAR(20) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8;

drop table if exists t_user;

create table t_user(
email varchar(50) not null default '',
type int(1) not null default 1 comment '1-buyer, 2-seller',
nickname varchar(50) default null,
primary key(email)
)engine=InnoDB default charset=utf8;


ALTER TABLE t_product
RENAME COLUMN acive_yn TO active_yn;

select * from  t_seller;
select * from t_product;
select * from t_image;
select * from t_product;

insert into t_seller(name, email, phone)
values('seller01', '01@email.com','010-0000-0000');


insert into t_category(category1,category2,category3)
values('컴퓨터', '주요부품', '메인보드');
insert into t_category(category1,category2,category3)
values('컴퓨터', '주변기기', '마우스');
insert into t_category(category1,category2,category3)
values('컴퓨터', '주변기기', '키보드');

insert into t_product(product_name, product_price, delivery_price,seller_id,category_id ) 
values('lg마우스',15000,3000,1,2);
insert into t_product(product_name, product_price, delivery_price,seller_id,category_id ) 
values('logitec 마우스',18000,3000,1,2);

insert into t_iamge(product_id,type,path)
values(2,1,'upload/2/thumnail.jpg');
insert into t_iamge(product_id,type,path)
values(3,1,'upload/3/thumnail2.jpg');

select concat(c.category1, '/' ,c.category2, '/' ,c.category3) as category
,p.id
,p.product_name
,p.delivery_price
,i.*
from t_product p
join t_category c
on p.category_id = c.id
 join t_iamge i
on p.id = i.product_id
and i.type =1 -- 메인이미지
where p.product_name = 'lg마우스';

se
