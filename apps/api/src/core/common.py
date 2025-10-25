import bson


def generate_id() -> str:
    return str(bson.ObjectId())
