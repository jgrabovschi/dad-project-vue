<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Pagination, PaginationList, PaginationFirst, PaginationPrev, PaginationListItem, PaginationEllipsis, PaginationNext, PaginationLast } from '@/components/ui/pagination'
import { useGamesStore } from '@/stores/games';
import GameHistoryFormFilter from './GameHistoryFormFilter.vue'

const gamesStore = useGamesStore()
gamesStore.loadGames()

</script>

<template>
  <div class="flex justify-center items-center p-4">
    <Card class="w-full max-w-6xl h-auto rounded-lg bg-white dark:bg-gray-800 border-0 shadow-md">
      <CardHeader class="px-4">
        <CardTitle class="text-lg md:text-xl text-black dark:text-white">Game History</CardTitle>
        <CardDescription class="text-sm md:text-base">Use the filters and click on each game to see the scoreboards.</CardDescription>
      </CardHeader>
      <CardContent>
        <GameHistoryFormFilter class="p-4" />
        <div class="overflow-x-auto">
          <Table class="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead class="w-[150px] md:w-[200px] dark:text-white text-xs md:text-sm">Date</TableHead>
                <TableHead class="dark:text-white text-xs md:text-sm">Status</TableHead>
                <TableHead v-if="gamesStore.typeFilter == 'multiplayer'" class="dark:text-white text-xs md:text-sm">Creator</TableHead>
                <TableHead v-if="gamesStore.typeFilter == 'multiplayer'" class="dark:text-white text-xs md:text-sm">Winner</TableHead>
                <TableHead class="dark:text-white text-xs md:text-sm">Board</TableHead>
                <TableHead class="dark:text-white text-xs md:text-sm">Total Time</TableHead>
                <TableHead class="dark:text-white text-xs md:text-sm">Total Moves</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="game in gamesStore.games" :key="game.id">
                <TableCell class="font-medium dark:text-slate-300 text-xs md:text-sm">
                  {{ game.ended_at }}
                </TableCell>
                <TableCell class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.status == 'E' ? 'Ended' : game.status == 'PE' ? 'Pending' : game.status == 'I' ? 'Interrupted' : 'In Progress' }}
                </TableCell>
                <TableCell v-if="game.type == 'M'" class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.created ?? 'No Creator'}}
                </TableCell>
                <TableCell v-if="game.type == 'M'" class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.winner ?? 'No Winner'}}
                </TableCell>
                <TableCell class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.board_id.board_cols + 'x' + game.board_id.board_rows }}
                </TableCell>
                <TableCell class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.total_time ? game.total_time + ' seconds' : 'No Time' }}
                </TableCell>
                <TableCell class="dark:text-slate-300 text-xs md:text-sm">
                  {{ game.total_turns_winner ? game.total_turns_winner : 'No Moves' }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <br>
        <Pagination
          :v-slot="gamesStore.currentPage"
          :total="gamesStore.totalItems"
          :sibling-count="2"
          show-edges
          :default-page="gamesStore.currentPage"
        >
          <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
            <PaginationFirst @click="gamesStore.toPage(1)" />
            <PaginationPrev @click="gamesStore.previousPage" />
    
            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  @click="gamesStore.toPage(item.value)"
                  class="w-8 h-8 md:w-10 md:h-10 p-0"
                  :variant="gamesStore.currentPage == item.value ? 'default' : 'outline'"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis
                class="dark:text-white"
                v-else
                :key="item.type"
                :index="index"
              />
            </template>
            <PaginationNext @click="gamesStore.nextPage" />
            <PaginationLast @click="gamesStore.toPage(gamesStore.pages)" />
          </PaginationList>
        </Pagination>
      </CardContent>
    </Card>
  </div>
</template>
