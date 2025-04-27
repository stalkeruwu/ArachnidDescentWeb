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
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        buy(id){
            
        }
    }
})
.mount('#app');