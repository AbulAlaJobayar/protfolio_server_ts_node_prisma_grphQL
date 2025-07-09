"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../shared/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const superAdminEmail = "abulalajobayar@gmail.com";
        // Check if super admin already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email: superAdminEmail },
        });
        if (existingUser) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Super admin already exists.");
        }
        const hashedPassword = yield bcrypt_1.default.hash("jobayar12345@", 10);
        yield prisma.user.create({
            data: {
                name: "Abul Ala Jobayar",
                email: superAdminEmail,
                password: hashedPassword,
                photo: "https://i.ibb.co/cCNWdT6/about.jpg",
                description: "Hello, I am Abul Ala Jobayar, a Full Stack Developer with expertise in Node.js, Express.js, React.js, and MongoDB. I have a passion for building scalable web applications and delivering high-quality software solutions.",
                role: "admin",
            },
        });
        console.log("✅ Super admin created.");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
