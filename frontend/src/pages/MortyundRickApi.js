
    export const obtenerConversacionCompleta = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/mortyundrick/backend', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error al obtener la conversación: ${error}`);
            return null;
        }
    };

