# Food API Spec

## Food List

- **Endpoint:** `/foods`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page`
    - Default: `1`
    - Example: `/foods?page=2`
  - `limit`
    - Default: `10`
    - Example: `/foods?limit=20`
  - `q` (optional)
    - Example: `/foods?q=french`
- **Response (Success):**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Foods fetched successfully",
      "data": {
        "foods": [
          {
            "id": "xxxxx-xxx-xxx-...",
            "FoodItem": "Activia",
            "FoodCategory": "Yogurt",
            "per100grams": "100g",
            "Cals_per100grams": "74 cal",
            "KJ_per100grams": "311 kJ"
          },
          ...
        ],
        "totalItems": 2xxx,
        "itemsPerPage": 10,
        "totalPages": 2xx,
        "currentPage": 1,
        "previousPage": null,
        "nextPage": 2
      }
    }
    ```
