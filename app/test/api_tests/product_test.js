let chai = require("chai"),
    expect = chai.expect,
    chaiHttp = require("chai-http"),
    chaiExclude = require("chai-exclude"),
    product_req = require("../request/product_req"),
    product_res = require("../response/product_res"),
    config = require("../config/config");

chai.use(chaiHttp);
chai.use(chaiExclude);

describe('Product Operations (positive)', () => {

    it('should return all the products in requested category', (done) => {

        chai.request(config.base_url)
            .get(product_req.end_point1 + product_req.categoryId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(product_res.category_products);
                done();
            });
    });

    it('should create a new product', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status').eql(true);
                expect(res.body.data).excludingEvery(['_id', 'created_at', 'updated_at', '__v', 'status']).to.eql(product_res.create_product);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should create a new product when extra properties are added', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_with_rating)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status').eql(true);
                expect(res.body.data).excludingEvery(['_id', 'created_at', 'updated_at', '__v', 'status']).to.eql(product_res.create_product);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should return products with requested product id', (done) => {

        chai.request(config.base_url)
            .get(product_req.end_point2 + product_req.productId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(product_res.product);
                done();
            });
    });

    it('should update requested product', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.update_product)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').eql(true);
                done();
            });
    });

});

describe("Product Operations (negative)", () => {

    it('should not return any products if wrong category id id passed', (done) => {

        chai.request(config.base_url)
            .get(product_req.end_point1 + product_req.wrong_categoryId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.count).to.eql(0);
                expect(res.body.data).to.eql([]);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should not create new product if no token is passed', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .send(product_req.product)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should not create new product if name is not passed', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_without_name)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_name);
                done();
            });
    });

    it('should not create new product if any category is not passed', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_without_category)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_category);
                done();
            });
    });

    it('should not create new product if category is not passed as an array', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_without_category_array)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_category);
                done();
            });
    });

    it('should not create new product if description is not passed', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_without_description)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_description);
                done();
            });
    });

    it('should not create new product if price is not passed', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_without_price)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_price);
                done();
            });
    });

    it('should not create new product if price is not a number', (done) => {

        chai.request(config.base_url)
            .post(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.product_string_price)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_price);
                done();
            });
    });

    it('should not return any product if wrong product id is paseed', (done) => {

        chai.request(config.base_url)
            .get(product_req.end_point2 + product_req.wrong_productId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.count).to.eql(0);
                expect(res.body.data).to.eql([]);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should not update product if token is not passed', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .send(product_req.update_product)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should not update product if product id is not passed as parameter', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point2)
            .set("authorization", config.token)
            .send(product_req.update_product)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should not update product if name is not passed', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_without_name)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_name);
                done();
            });
    });

    it('should not update product if category is not passed', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_without_category)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_category);
                done();
            });
    });

    it('should not update product if category is not passed as array', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_without_category_array)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_category);
                done();
            });
    });

    it('should not update product if description is not passed', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_without_description)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_description);
                done();
            });
    });

    it('should not update product if price is not passed', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_without_price)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_price);
                done();
            });
    });

    it('should not update product if price is not passed as number', (done) => {

        chai.request(config.base_url)
            .put(product_req.end_point3)
            .set("authorization", config.token)
            .send(product_req.product_string_price)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(product_res.error_message_price);
                done();
            });
    });
});