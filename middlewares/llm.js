import { getGenerativeModel } from '@google/generative-ai'


async function answerFromPDF(base64PDF) {
    try {
        // Configura la API
        getGenerativeModel({
            apiKey: process.env.GEMINI_API_KEY,
        })

        const prompt = `
            [INSTRUCCIONES]: Eres un asistente de IA que extrae información de facturas de servicios públicos. Solo responde con el contenido que haya en la imagen, no te inventes nada ni extraigas información de otros lugares. Responde un json key-value donde el key sea "nombre", "dirección" y "tipo de servicio" y el value tu respuesta. Si no sabes la respuesta responde un null.
            Aquí está el contenido de la imagen en formato Base64:
            ${base64Image}
        `;
        // Llama al modelo Gemini Pro
        const response = await getGenerativeModel('gemini-pro').generateText({
            prompt,
        })

        // Devuelve la respuesta del modelo
        return response[0].text
    } catch (error) {
        console.error('Error al consultar el modelo:', error)
    }
}

// Ejemplo de uso
const base64PDF = 'JVBERi0xLj...' // Reemplaza con el contenido Base64 del PDF

answerFromPDF(query, base64PDF)
    .then(answer => console.log('Respuesta:', answer))
    .catch(error => console.error(error))
