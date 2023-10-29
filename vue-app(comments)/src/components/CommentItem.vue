<template>
    <div class="comment">
        <div class="comment__body" :class="commentColor">
            <p class="comment__author"><strong>{{ comment.author }}</strong></p>
            <p class="comment__text">{{ comment.text }}</p>
            <p class="comment__reaction"><span class="reaction__smile">{{ commentReaction }}</span></p>
            <p class="comment__answers-count" v-if="comment.children.length > 0"><strong>Ответов:</strong>{{ comment.children.length }}</p>
            <my-button class="comment__btn" @click="createAnswer">Ответить</my-button>
            <time class="comment__time">{{ commentDate }}</time>
            <my-dialog v-model:show="dialogVisible">
                <comment-form @create="createComment"></comment-form>
            </my-dialog>
        </div>
        <comment-item  class="childComment" v-for="childComment in comment.children" :key="childComment.id" :comment="childComment"></comment-item>
    </div>
    
</template>

<script>
import MyDialog from './UI/MyDialog.vue';
import MyButton from './UI/MyButton.vue';
import CommentForm from './CommentForm.vue';
export default {
    data() {
        return {
            dialogVisible: false
        }
    },
    components: {MyDialog, CommentForm, MyButton},
    props: {
        comment: {
            type: Object,
            requrired: true,
        }
    },
    methods: {
        createAnswer() {
            this.dialogVisible = true
        },
        async createComment(comment) {
            this.dialogVisible = false;
            comment.parentId = this.comment.id;
            await fetch('http://194.67.93.117:80/comments', {
            method: "post",
            headers: {
              'Username' : 'FelixKond',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
        }
    },

    computed: {
        commentDate() {
            let date = new Date(this.comment.createdAt);

            const formattedDate = date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const formattedTime = date.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `${formattedDate}, ${formattedTime}`;
        },

        commentColor() {
            let reactionSumm = 0;

            if (this.comment.children.length > 0) {
                for (let childComment of this.comment.children) {
                    reactionSumm = reactionSumm + Number(childComment.reaction);
                }
            }

            if (reactionSumm > 0) {
                return "green";
            }

            if (reactionSumm < 0) {
                return "red";
            }
        },

        commentReaction() {

            let smile = '';

            if (this.comment.reaction == '1') {
                smile = '👍'
            }

            if (this.comment.reaction == '0') {
                smile = '🗿'
            }

            if (this.comment.reaction == '-1') {
                smile = '👎'
            }

            return smile;
        }
    }
}
</script>

<style scoped>

    .comment {
        max-width: 1023px;
        margin: 0 auto;
    }
    .comment__body {
        padding: 15px;
        border: 2px solid rgb(0, 0, 0);
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: column;
        border-radius: 20px;
        box-shadow: 10px 10px 10px rgb(136, 136, 136);
        margin-left: 20px;
        margin-right: 20px;
        max-width: 1023px;
        
    }

    .comment__text {
        white-space: normal;
        word-wrap: break-word;
        max-width: 100%;
    }

    .comment__author {
        word-wrap: break-word;
        font-size: 20px;
    }
    .comment__btn {
        margin-top: 20px;
        max-width: fit-content;
    }

    .comment__time {
        margin-left: auto;
        word-wrap: break-word;
    }

    .reaction__smile {
        font-size: 30px;
    }

    .red {
        background-color: rgb(255, 188, 188);
    }

    .green {
        background-color: rgb(189, 255, 189);
    }


.childComment {
    margin-left: 30px;
    max-width: 1023px;
}

@media (min-width: 275px) and (max-width: 500px){
    .childComment {
        margin-left: 15px;
        
    }

    .comment {
        
        
    }
}
</style>