select c.id, p.name, p.desc, p.img_url, p.price, c.size, c.quantity from cart c
join products p 
on p.id = c.product_id
where user_id = $1;