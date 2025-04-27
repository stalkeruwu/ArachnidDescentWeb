const { createApp, ref } = Vue
import API_BASE_URL from './config.js';


createApp({
    setup() {
        const skins = ref([]);
        const user = ref({ name: '', balance: 0 });

        const fetchSkins = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/user/skins`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming token is stored in localStorage
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch skins');
                }

                const data = await response.json();
                skins.value = data;
            } catch (error) {
                console.error('Error fetching skins:', error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/user/details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }


                const data = await response.json();
                console.log(data);
                user.value.name = data.username;
                user.value.balance = data.balance;
                console.log(user.value);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchSkins();
        fetchUserDetails();

        return {
            skins,
            user
        };
    },
    methods:{
        async buy(skinId) {
            try {
                const response = await fetch(`${API_BASE_URL}/user/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({ skinId })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to purchase skin');
                }

                alert('Skin purchased successfully!');

                // Update the skin to owned
                const skin = this.skins.find(s => s.skin_id === skinId);
                if (skin) {
                    skin.is_owned = true;
                }

                await fetchSkins(); // Refresh the skins list
            } catch (error) {
                console.error('Error purchasing skin:', error);
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';

                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000); // Hide the error message after 5 seconds
            }
        }
    }
})
.mount('#app');