<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { inject } from 'vue'


const alertDialog = inject('alertDialog')
const router = useRouter()
const storeAuth = useAuthStore()
const storeError = useErrorStore()

const credentials = ref({
    email: '',
    password: '',
    name: '',
    nickname: '',
    photo_filename: null
})

const previewUrl = ref(null) // Ref to store the preview URL

const onFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
            credentials.value.photo_filename = reader.result
            previewUrl.value = reader.result // Set the preview URL
        }
        reader.readAsDataURL(file)
    } else {
        storeError.setErrorMessages('The selected file must be an image.')
        credentials.value.photo_filename = null
        previewUrl.value = null // Clear the preview URL
    }
}

const updateProfile = () => {
  alertDialog.value.open(
  updateConfirmed,
'Are you sure?', 'Cancel', `Yes, update my profile`,
 `This action cannot be undone. This will permanently update your profile.`
  )
}

const updateConfirmed = () => {
  storeAuth.updateProfile(credentials.value)
}

</script>

<template>
    <Card class="w-[450px] mx-auto my-8 p-8 bg-white dark:bg-gray-800 border-0">
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="name">Update your Name</Label>
            <Input id="name" type="text" placeholder="New User Name" v-model="credentials.name" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('name')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="nickname">Update your Nickname</Label>
            <Input id="nickname" type="text" placeholder="New User Nickname" v-model="credentials.nickname" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('nickname')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="email">Update your Email</Label>
            <Input id="email" type="email" placeholder="New User Email" v-model="credentials.email" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('email')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="email">Update your password</Label>
            <Input id="password" type="password" placeholder="New password" v-model="credentials.password" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('password')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="photo_filename">Update your photo or avatar</Label>
            <Input id="photo_filename" type="file" @change="onFileChange" class="dark:bg-slate-300 cursor-pointer" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('photo_filename')"></ErrorMessage>
            <div v-if="previewUrl" class="mt-4 text-center">
              <Label class="text-black dark:text-white">Image Preview</Label>
              <img :src="previewUrl" alt="Image Preview" class="w-24 h-24 rounded-full mx-auto" />
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-end space-x-4">
          <Button @click.prevent="updateProfile" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition">
            Update Profile
          </Button>
        </div>
    </Card>
</template>