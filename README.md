
#### Backend README

```markdown
# DANA Flood Relief Backend

This project aims to help the people affected by the DANA floods in Valencia, Spain. Affected people can list the items they need, and people who want to help can buy these items for them. The items will be delivered directly and only to the address of the victim, verified by geolocation and utility bills. Helpers may also buy in bulk.

Este proyecto tiene como objetivo ayudar a las personas afectadas por las inundaciones de la DANA en Valencia, España. Las personas afectadas pueden listar los artículos que necesitan, y las personas que quieran ayudar pueden comprar estos artículos para ellas. Los artículos se entregarán directamente y solo en la dirección de la víctima, verificada por geolocalización y facturas de servicios públicos. Quienes quieran ayudar también pueden comprar más cantidad / al por mayor.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Turf.js**: Geospatial analysis library.
- **Gemini API**: For reading utility bills.

## Environment Variables

Create a `.env` file with the following variables:
```plaintext
PORT=5005
ORIGIN=http://localhost:5173
MONGODB_URI='your-mongodb-uri'
TOKEN_SECRET='your-jwt-token'
CLOUDINARY_NAME='your-cloudinary-name'
CLOUDINARY_KEY='your-cloudinary-key'
CLOUDINARY_SECRET='your-cloudinary-secret'
GOOGLE_APPLICATION_CREDENTIALS="your-google-credentials-path"
GEMINI_API_KEY='your-gemini-api-key'
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CrisRamosLazaro/dana-server.git
cd backend

2. **Install dependencies**
```bash
npm install
```

1. **Run the development server**
```bash
npm run dev
 ```