<template>
    <div>
        <comment-item v-for="comment in comments" :key="comment.id" :comment="comment"></comment-item>
    </div>
</template>
<script>
import CommentItem from "./CommentItem.vue";

export default {
    components: {CommentItem},
    props: {
        comments: {
            type: Array,
            required: true,
        }
    },
}
</script>
<style scoped>
    
</style>