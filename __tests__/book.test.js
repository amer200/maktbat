const { addBook, getById, getByCateg, getAll, deleteBook, edit } = require("../controllers/book");
const Book = require("../models/book");

jest.mock("../models/book");

describe("Book Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: "Test Book",
                categ: "Test Category",
                isUsed: true,
                desc: "Test Description",
                auther: "Test Author",
                price: 100,
                amount: 10,
            },
            user: { user: { id: "user1" } },
            params: { id: "book1", cId: "categ1", bId: "book1" },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // محاكاة Book.save
        Book.prototype.save = jest.fn().mockResolvedValue(req.body);

        // محاكاة Book.findById
        Book.findById = jest.fn().mockResolvedValue(req.body);

        // محاكاة Book.find
        Book.find = jest.fn().mockResolvedValue([req.body]);

        // محاكاة Book.findOneAndDelete
        Book.findOneAndDelete = jest.fn().mockResolvedValue(req.body);
    });

    it("should add a book successfully", async () => {
        await addBook(req, res);

        expect(Book.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
            data: req.body,
        });
    });

    it("should get a book by ID successfully", async () => {
        await getById(req, res);

        expect(Book.findById).toHaveBeenCalledWith("book1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
            data: req.body,
        });
    });

    it("should get books by category successfully", async () => {
        await getByCateg(req, res);

        expect(Book.find).toHaveBeenCalledWith({ categ: "categ1" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
            data: [req.body],
        });
    });

    it("should get all books successfully", async () => {
        await getAll(req, res);

        expect(Book.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
            data: [req.body],
        });
    });

    it("should delete a book successfully", async () => {
        await deleteBook(req, res);

        expect(Book.findOneAndDelete).toHaveBeenCalledWith({
            _id: "book1",
            user: "user1",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
        });
    });

    it("should return 404 if book not found for delete", async () => {
        Book.findOneAndDelete.mockResolvedValue(null);

        await deleteBook(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            msg: "not found !",
        });
    });

    it("should edit a book successfully", async () => {
        req.body.name = "Updated Book";

        await edit(req, res);

        expect(Book.findOne).toHaveBeenCalledWith({ _id: "book1", user: "user1" });
        expect(Book.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            msg: "ok",
            data: req.body,
        });
    });

    it("should return 404 if book not found for edit", async () => {
        Book.findOne.mockResolvedValue(null);

        await edit(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            msg: "not found !",
        });
    });

    it("should handle server errors gracefully", async () => {
        Book.findById.mockRejectedValue(new Error("Database error"));

        await getById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Database error",
        });
    });
});