let chai = require("chai"),
    expect = chai.expect,
    chaiHttp = require("chai-http"),
    category_req = require("../request/category_req"),
    category_res = require("../response/category_res"),
    config = require("../config/config");


chai.use(chaiHttp);

describe('Category Operations (positive)', () => {

    it('should return all the categories', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(category_res.all_categories);
                done();
            });
    });

    it('should create a new category', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .set("authorization", config.token)
            .send(category_req.category)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status').eql(true);
                expect(res.body.data).excludingEvery(['_id', 'created_at', 'updated_at', '__v', 'status']).to.eql(category_res.create_category);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should create a new category when extra property is passed', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .set("authorization", config.token)
            .send(category_req.category_with_addedBy)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status').eql(true);
                expect(res.body.data).excludingEvery(['_id', 'created_at', 'updated_at', '__v', 'status']).to.eql(category_res.create_category);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should return categories with requested category id', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1 + category_req.categoryId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(category_res.category);
                done();
            });
    });

    it('should return products of reuested category id', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1 + category_req.categoryId + category_req.end_point2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql(category_res.products);
                done();
            });
    });

});

describe("Category Operations (negative)", () => {

    it('should not return any category when wrong category id is passed', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1 + category_req.wrong_categoryId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.count).to.eql(0);
                expect(res.body.data).to.eql([]);
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should give error when invalid category id is passed', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1 + category_req.invalid_categoryId)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body.count).to.eql(0);
                expect(res.body.data).to.eql([]);
                expect(res.body.error[0].message).to.eql(category_res.error_message);
                done();
            });
    });

    it('should not create new category if no token is passed', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .send(category_req.category)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should not create new category if parent is not passed', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .set("authorization", config.token)
            .send(category_req.category_without_parent)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(category_res.error_message_parent);
                done();
            });
    });

    it('should not create new category if category name is not passed', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .set("authorization", config.token)
            .send(category_req.category_without_name)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(category_res.error_message_name);
                done();
            });
    });

    it('should not create new category if category details is not passed', (done) => {

        chai.request(config.base_url)
            .post(category_req.end_point1)
            .set("authorization", config.token)
            .send(category_req.category_without_details)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.error).to.eql(category_res.error_message_details);
                done();
            });
    });

    it('should return any product if wrong category id is passed', (done) => {

        chai.request(config.base_url)
            .get(category_req.end_point1 + category_req.wrong_categoryId + category_req.end_point2)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.count).to.eql(0);
                expect(res.body.data).to.eql([]);
                expect(res.body.error).to.eql([]);
                done();
            });
    });
});