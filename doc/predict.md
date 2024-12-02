# Prediction API Spec

## Basal Metabolic Rate (BMR) and Calorie prediction

- **Endpoint:** `/predicts`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Request Body For Own User:**
  ```json
  {
    "activity": "Lightly active",
    "foods": ["Hamburger", "French Fries", "Fish Sandwich"]
  }
  ```
- **Request Body For Other People (Custom Prediction):**
  ```json
  {
    "age": 25,
    "height": 170,
    "weight": 55,
    "gender": "Female",
    "activity": "Lightly active",
    "foods": ["Hamburger", "French Fries", "Fish Sandwich"]
  }
  ```
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Prediction calculated successfully",
      "data": {
        "age": 25,
        "height": 170,
        "weight": 55,
        "gender": "Female",
        "activity": {
          "level": "Lightly active",
          "factor": 1.375
        },
        "basalMetabolicRate": "1305 cal",
        "calories": "1794 cal",
        "foodProportions": [
          {
            "food": "Hamburger",
            "calories": "254 cal",
            "portion": "42g"
          },
          {
            "food": "French Fries",
            "calories": "312 cal",
            "portion": "52g"
          },
          {
            "food": "Fish Sandwich",
            "calories": "273 cal",
            "portion": "46g"
          }
        ]
      }
    }
    ```
