from pymongo import MongoClient

MONGO_URI = "mongodb+srv://caiomgf50:data0804base@calculadora.xmbxlon.mongodb.net/?retryWrites=true&w=majority&appName=calculadora"
client = MongoClient(MONGO_URI)
db = client["calculator"]
collection = db["history"]
