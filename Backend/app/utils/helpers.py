def get_missing_fields(data, required_fields):
    missing = []

    for field in required_fields:
        if field not in data or not data[field]:
            missing.append(field)

    return missing