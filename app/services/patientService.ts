    
const DEFAULT_URL = "http://localhost:8000";

    export const patientService = {

        analyzeSample: async (formData: FormData) => {            
            const response = await fetch(`${DEFAULT_URL}/analyze`, {
                method: 'POST',
                body: formData,
            });

            return response.json();
        },

        confirmSample: async (patientData: any) => {
            const response = await fetch(`${DEFAULT_URL}/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            return response.json();
        }
    }