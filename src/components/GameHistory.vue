<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Pagination, PaginationList, PaginationFirst, PaginationPrev, PaginationListItem, PaginationEllipsis, PaginationNext, PaginationLast } from '@/components/ui/pagination'
import { useGamesStore } from '@/stores/games';

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
                        <TableHead class="dark:text-white">Status</TableHead>
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
                    <TableCell class="dark:text-slate-300">{{ game.status == 'E' ? 'Ended' : game.status == 'PE' ? 'Pending' : game.status == 'I' ? 'Interrupted' : 'In Progress' }}</TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.type == 'S' ? 'Single Player' : 'Multi Player' }}</TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.winner_user_id?.name ?? 'No Winner'}}</TableCell>
                    <TableCell class="dark:text-slate-300">{{ game.board_id.board_rows + 'x' + game.board_id.board_cols }}</TableCell>
                    <TableCell class="dark:text-slate-300">
                        {{ game.total_time ? game.total_time + ' seconds' : 'No Time' }} 
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            <br>
            <Pagination v-slot="{ page }" :total="gamesStore.totalItems" :sibling-count="2" show-edges :default-page="gamesStore.currentPage">
            <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
              <PaginationFirst @click="gamesStore.toPage(1)" />
              <PaginationPrev @click="gamesStore.previousPage" />
        
              <template v-for="(item, index) in items">
                <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                  <Button @click="gamesStore.toPage(item.value)" class="w-10 h-10 p-0" :variant="item.value == page ? 'default' : 'outline'">
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis class="dark:text-white" v-else :key="item.type" :index="index" />
              </template>
              <PaginationNext @click="gamesStore.nextPage" />
              <PaginationLast @click="gamesStore.toPage(gamesStore.pages)" />
            </PaginationList>
          </Pagination>
        </CardContent>
    </Card>

</template>