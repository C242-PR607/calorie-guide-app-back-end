# Predict API Spec

## Basal Metabolic Rate (BMR) and Calorie prediction

Endpoint : POST /api/v1/predicts

Request Headers : Authorization (Bearer Token)

Request Body For Own User :

```json
{
  "activity": "Lightly active",
  "foods": ["Hamburger", "French Fries", "Fish Sandwich"]
}
```

Request Body For Other People (Custom Prediction) :

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
