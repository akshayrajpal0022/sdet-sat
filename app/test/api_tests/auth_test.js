let chai = require("chai"),
    expect = chai.expect,
    chaiHttp = require("chai-http"),
    auth_req = require("../request/auth_req"),
    auth_res = require("../response/auth_res");
    config = require("../config/config");

chai.use(chaiHttp);

describe("User SignIn", () => {
    var token;
    it('user should be logged in with valid credentials', (done) => {

        chai.request(config.base_url)
            .post(auth_req.end_point)
            .send(auth_req.credentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').eql(true);
                expect(res.body.data).to.have.property('token');
                expect(res.body.error).to.eql([]);
                done();
            });
    });

    it('should not be able to login with invalid credentials', function (done) {

        chai.request(config.base_url)
            .post(auth_req.end_point)
            .send(auth_req.invalid_credentials)
            .end((err, res) => {
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('status').eql(false);
                expect(res.body.data).not.to.have.property('token');
                expect(res.body.error).to.eql(auth_res.error);
                done();
            });
    });
});