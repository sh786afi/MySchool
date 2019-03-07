import request from "supertest";
import {app} from "../src/app";
import {schemaClass} from "../src/schema/class.schema";
import mongoose from "mongoose";

const fakeId= new mongoose.Types.ObjectId();
const classOneId = new mongoose.Types.ObjectId();
const classOne = {
        _id: classOneId,
        ClassName : 'batch1New',
        CapacityOfStudent:25
}

beforeEach(async ()=>{
    await schemaClass.deleteMany();
    const createClass=new schemaClass(classOne);
    await createClass.save();
})
test("Should create a class", async ()=>{
    await request(app)
    .post('/class')
    .send({
        ClassName : 'batch1',
        CapacityOfStudent:25
    })
    .expect(200)
});
test("Should Not create a class with Invalid Data", async ()=>{
    await request(app)
    .post('/class')
    .send({})
    .expect(400)
});
test("Get All classes", async ()=>{
    await request(app)
    .get('/class')
    .expect(200)
    .expect((res)=>{
        expect(res.body.length).toBe(1);
    })
});
test("Get classes By Id", async ()=>{
    await request(app)
    .get(`/class/${classOneId}`)
    .send()
    .expect(200)

});
test("Should not Get classes By Wrong ObjectId", async ()=>{
    await request(app)
    .get(`/class/${fakeId}`)
    .send()
    .expect(400)
});
test("Should not Get classes By Invalid Id", async ()=>{
    await request(app)
    .get(`/class/12345567777`)
    .send()
    .expect(500)
});
test("Delete classes By Id", async ()=>{
    await request(app)
    .delete(`/class/${classOneId}`)
    .send()
    .expect(200)
});
test("Should not Delete class By Wrong ObjectId", async ()=>{
    await request(app)
    .delete(`/class/${fakeId}`)
    .send()
    .expect(400)
});
test("Should not Delete class By Invalid Id", async ()=>{
    await request(app)
    .delete(`/class/12345567777`)
    .send()
    .expect(500)
});
test("Update classes By Id", async ()=>{
    await request(app)
    .patch(`/class/${classOneId}`)
    .send({
        ClassName : 'UpdatedBatch1New',
        CapacityOfStudent:26
    })
    .expect(200)
});
test("Should not Update class By Wrong ObjectId", async ()=>{
    await request(app)
    .patch(`/class/${fakeId}`)
    .send({
        ClassName : 'UpdatedBatch1New',
        CapacityOfStudent:26
    })
    .expect(404)
});
test("Should not Update class By Invalid Id", async ()=>{
    await request(app)
    .patch(`/class/abcd12345`)
    .send()
    .expect(400)
});