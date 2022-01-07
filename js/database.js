var db = window.openDatabase("Crips_shop","1.0","Crips Shop", 200000);

function initialize_database() {
    db.transaction(function(tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL)`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('city'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS district (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          city_id INTEGER NOT NULL,
                          FOREIGN KEY (city_id) REFERENCES city(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('district'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS ward (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          district_id INTEGER NOT NULL,
                          FOREIGN KEY (district_id) REFERENCES district(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('ward'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS category (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          parent_id INTEGER NULL,
                          FOREIGN KEY (parent_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('category'),
          transaction_fail
      );
      
      query = `CREATE TABLE IF NOT EXISTS product (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          price REAL NOT NULL,
                          image TEXT NULL,
                          category_id INTEGER NOT NULL,
                          FOREIGN KEY (category_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('product'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS cart (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          account_id INTEGER NOT NULL,
                          product_id INTEGER NOT NULL,
                          quantity INTEGER NOT NULL,
                          FOREIGN KEY (account_id) REFERENCES account(id),
                          FOREIGN KEY (product_id) REFERENCES product(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('cart'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        price REAL NOT NULL,
        image TEXT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id))`;

      tx.executeSql(
            query, 
            [], 
            table_transaction_success('product'),
        transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS account (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          username TEXT UNIQUE NOT NULL,
                          password TEXT NOT NULL,
                          firstname TEXT NULL,
                          lastname TEXT NULL,
                          birthday REAL NULL,
                          phone TEXT NULL,
                          ward_id INTEGER NULL,
                          district_id INTEGER NULL,
                          city_id INTEGER NULL,
                          status INTEGER NOT NULL,
                          FOREIGN  KEY (city_id) REFERENCES city(id),
                          FOREIGN  KEY (ward_id) REFERENCES ward(id),
                          FOREIGN  KEY (district_id) REFERENCES district(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('account'),
          transaction_fail
      );
  });
}

function fetch_database() {
  db.transaction(function(tx) {
      var query = `INSERT INTO category (name) VALUES (?)`;

      tx.executeSql(query, ['Nike'], insert_transaction_success('Nike'), transaction_fail);
      tx.executeSql(query, ['Adidas'], insert_transaction_success('Adidas'), transaction_fail);
      tx.executeSql(query, ['Balenciaga'], insert_transaction_success('Balenciaga'), transaction_fail);
      tx.executeSql(query, ['Vans'], insert_transaction_success('Vans'), transaction_fail);
     
 
      query = `INSERT INTO product (name, price, category_id, image) VALUES (?, ?, ?, ?)`;
      tx.executeSql(query, ['Nike Air Force 1', 200, '1', 'img/shoe1.jpg'], insert_transaction_success('Product 01'), transaction_fail);
      tx.executeSql(query, ['Nike court Legacy', 299, '1','img/shoe2.jpg'], insert_transaction_success('Product 02'), transaction_fail);
      tx.executeSql(query, ['Nike Jordan 1', 249, '1','img/shoe3.jpg'], insert_transaction_success('Product 04'), transaction_fail);
      tx.executeSql(query, ['Adidas Ultraboost', 249, '2','img/shoe4.jpg'], insert_transaction_success('Product 05'), transaction_fail);
      tx.executeSql(query, ['Adidas NMD', 329, '2','img/shoe5.jpg'], insert_transaction_success('Product 06'), transaction_fail);
      tx.executeSql(query, ['Yeezy 700', 599, '2','img/shoe6.jpg'], insert_transaction_success('Product 07'), transaction_fail);
      tx.executeSql(query, ['Balenciaga Triple S', 499, '3','img/shoe7.jpg'], insert_transaction_success('Product 08'), transaction_fail);
      tx.executeSql(query, ['Balenciaga Speed Trainer', 599, '3','img/shoe8.jpg'], insert_transaction_success('Product 09'), transaction_fail);
      tx.executeSql(query, ['Balenciaga Track 3.0', 599, '3','img/shoe9.jpg'], insert_transaction_success('Product 10'), transaction_fail);
      tx.executeSql(query, ['Vans Oldskool', 199, '4','img/shoe10.jpg'], insert_transaction_success('Product 11'), transaction_fail);
      
      query = `INSERT INTO account (username, password, status) VALUES (?, ?, ?)`;
      tx.executeSql(query, ['mee2606', '123', 1], insert_transaction_success('mee2606'), transaction_fail); 
  });
};

function insert_transaction_success(name) {
    log(`INFO`, `Insert ${name} successfully.`)
};

function table_transaction_success(table_name) {
    log(`INFO`, `Create table ${table_name} successfully.`)
};

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
};
  
function transaction_fail(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`); 
};
