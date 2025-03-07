categoriestodolist-- create new table
CREATE TABLE products (
	id SERIAL PRIMARY KEY, -- tipe data serial akan generate angka berurut secara otomatis.
	product_name VARCHAR(255) NOT NULL, -- varchar tipe data string
	product_price DOUBLE PRECISION NOT NULL, -- double buat angka pecahan (desimal)
	category varchar(120)
);

CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	product_id INT NOT NULL, -- id product untuk relasi ke table products
	order_date DATE NOT NULL, -- DATE tipe data khusus tanggal
	quantity INT NOT NULL,
	CONSTRAIT fk_order_products FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE -- relasi table orders ke table products
); -- on delete cascade  : untuk menghapus data yang berkaitan
-- CONSTRAINT : untuk ngasih keterangan dan jaga konsistensi data

-- jika tabel terlanjur di buat bisa ditambah konstraint dengan kode berikut : 
ALTER TABLE orders
ADD CONSTRAINT fk_order_products
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;


-- insert data
INSERT INTO products (product_name, product_price, category)
VALUES 	('Baju', 15000000 ,'Fashion'),
		('Tpi', 10000000 ,'Fashion'),
		('Celana', 7000000 ,'Fashion');
		
INSERT INTO orders (product_id, order_date, quantity)
VALUES 	(1, '2025-02-10' ,5),
		(2, '2025-02-10',4),
		(4, '2025-02-10',4),
		(5, '2025-02-10',4);
		

-- hapus table
DROP TABLE nama_table;

-- ganti nama table
ALTER TABLE all_products RENAME TO products;

-- tambah kolom baru ke tabel
ALTER TABLE products ADD COLUMN description text;

-- edit nama kolom di table
ALTER TABLE products
RENAME COLUMN description TO product_desc;

-- edit tipe data kolom dalam table
ALTER TABLE products
ALTER COLUMN product_desc TYPE varchar(255);

-- hapus kolom
ALTER TABLE product
DROP COLUMN product_desc;

-- edit data di table
UPDATE products
SET product_name = 'Gaming Chair'
WHERE id = 3;

-- view few column
SELECT product_name, product_price FROM products;

-- delete data di table
DELETE FROM nama_table WHERE nama_kolom = nilai;

-- view all data
SELECT * FROM products
WHERE id = 1;


-- inner join (one to many / many to one) : query untuk gabungin data beberapa table
SELECT p.product_name, o.order_id, o.quantity FROM orders o
INNER JOIN products p ON p.id = o.product_id;

-- right join : contoh kasusnya nampilin products termasuk yang belum pernah dipesan 
SELECT * FROM orders o
RIGHT JOIN products p ON p.id = o.product_id;

-- left join  : kebalikan dari right join
SELECT * FROM products p
LEFT JOIN orders o ON o.product_id = p.id;

-- nyimpen hasil join pake query view.
CREATE VIEW order_products  AS 
SELECT p.product_name, o.order_id, o.quantity FROM orders o
INNER JOIN products p ON p.id = o.product_id;

SELECT * FROM order_products;

DROP VIEW order_products;


-- filter data pake where 
SELECT * FROM products WHERE category = 'Electronic'

-- grouping : ngelompokin data
SELECT category, COUNT(*) AS total_products FROM products GROUP BY category

-- sub query
-- buat ngammbil product dengan harga tertinggi pake query agregate max
SELECT * FROM products
WHERE product_price = (SELECT MAX(product_price) FROM products)  LIMIT 2; -- limit buat ngambil data dengan batas tertentu.