<script>
import axios from 'axios'

export default {
    async asyncData({ route }) {
        try {
            const response = await axios.get(
                `http://localhost:8000/auth/user/callback/google/${route.fullPath}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            )
            const auth = useCookie('_a')
            auth.value = response.data.token
            return navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    },
}
</script>
  