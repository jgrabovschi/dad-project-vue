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

const onFileChange = (event) => {
    const file = event.target.files[0]
    credentials.value.photo_filename = file
}

const cancel = () => {
    router.back()
}

const signup = () => {
    storeAuth.signup(credentials.value)
}
</script>

<template>
  <Card class="w-[450px] mx-auto my-8 p-4 px-8 bg-white dark:bg-gray-800 border-0">
    <CardHeader>
      <CardTitle class="text-black dark:text-white">Signup</CardTitle>
      <CardDescription>Enter your information to create your account</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="email">Name</Label>
            <Input id="name" type="text" placeholder="User Name" v-model="credentials.name" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('name')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="email">Nickname</Label>
            <Input id="nickname" type="text" placeholder="User Nickname" v-model="credentials.nickname" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('nickname')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="email">Email</Label>
            <Input id="email" type="email" placeholder="User Email" v-model="credentials.email" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('email')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="password">Password</Label>
            <Input id="password" type="password" placeholder="User Password" v-model="credentials.password" class="dark:bg-slate-300" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('password')"></ErrorMessage>
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label class="text-black dark:text-white" for="photo_filename">Insert your photo or avatar</Label>
            <Input id="photo_filename" type="file" @change="onFileChange" class="dark:bg-slate-300 cursor-pointer" />
            <ErrorMessage :errorMessage="storeError.fieldMessage('photo_filename')"></ErrorMessage>
          </div>
        </div>
        <br>
        <div class="flex justify-end space-x-4">
          <Button @click.prevent="cancel">Cancel</Button>
          <Button @click.prevent="signup">Sign Up</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>