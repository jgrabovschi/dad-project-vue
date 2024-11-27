<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { useGamesStore } from '@/stores/games';


const authStore = useAuthStore()
const gamesStore = useGamesStore()

gamesStore.loadGames()

</script>
<template>

    <Card class="w-11/12 mx-auto my-8 p-4 px-8 bg-white dark:bg-gray-800 border-0">
        <CardHeader>
        <CardTitle class="text-black dark:text-white">Game History</CardTitle>
        <CardDescription>Use the filters and click on each game to see the scoreboards.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[200px] dark:text-white">Date</TableHead>
                        <TableHead class="dark:text-white">Type</TableHead>
                        <TableHead class="dark:text-white">Winner</TableHead>
                        <TableHead class="dark:text-white">Board</TableHead>
                        <TableHead class="dark:text-white">Total Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow v-for="game in gamesStore.games">
                    <TableCell class="font-medium dark:text-slate-300">
                        {{ game.ended_at }}
                    </TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.type == 'S' ? 'Single Player' : 'Multi Player' }}</TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.winner_user_id?.name ?? 'No Winner'}}</TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.board_id.board_rows + 'x' + game.board_id.board_cols }}</TableCell>
                    <TableCell class="dark:text-slate-300">
                        {{ game.total_time }} seconds
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>

</template>