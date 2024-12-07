<script setup>
import { Card } from '@/components/ui/card'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ref } from 'vue'
import GeneralStatistics from './GeneralStatistics.vue';

const stats = ref(null)
const isLoading = ref(false)

</script>
<template>
    <div class="flex justify-center items-center p-4">
        <Card class="w-full max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader class="px-4">
                <CardTitle class="text-lg md:text-xl text-black dark:text-white">Statistics</CardTitle>
                <CardDescription class="text-sm md:text-base">Here you can see the overall statistics about this game.</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto">
                    <Tabs default-value="general">
                        <TabsList class="dark:bg-slate-600 dark:text-slate-300">
                            <TabsTrigger value="general">
                                General
                            </TabsTrigger>
                            <TabsTrigger value="password">
                                Password
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <GeneralStatistics />
                        </TabsContent>
                        <TabsContent value="password">
                            Change your password here.
                        </TabsContent>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    </div>    
</template>