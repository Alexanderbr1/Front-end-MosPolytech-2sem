<template>
  <div class="app">
    <section class="comments">
      <h1 class="comments__title">Comments({{ this.comments.length }})</h1>
      <div class="comments__switch">
        <label class="switch__label">
          Получать в реальном времени
          <input class="switch__checkbox" type="checkbox" v-model="realtimeEnabled" @change="handleRealtimeToggle" />
        </label>
      </div>
      <my-button @click="showDialog" class="comments__create-btn">Создать комментарий</my-button>
      <my-dialog v-model:show="dialogVisible">
        <comment-form class="comments__form" @create="createComment"></comment-form>
      </my-dialog>
      <comment-list class="comments__list" @create="createAnswer" :comments="rootComments"></comment-list>
    </section>
  </div>
</template>

<script>
import CommentForm from './components/CommentForm.vue';
import CommentList from './components/CommentList.vue';
import axios from 'axios';
import MyDialog from './components/UI/MyDialog.vue';
import MyButton from './components/UI/MyButton.vue';

  export default {
    components: {CommentList, CommentForm, MyDialog, MyButton},
    data() {
      return {
        comments: [],
        dialogVisible: false,
        realtimeEnabled: true,
        eventSorse: null,
      }
    },
    methods: {
      handleRealtimeToggle() {
        if (this.realtimeEnabled) {
          this.initializeSSE();
        } else {
          this.closeSSE();
        }
      },

      showDialog() {
          this.dialogVisible = true
      },
      async fetchComments() {
        try {
          const response = await axios.get('http://194.67.93.117:80/comments');
          console.log(response)
          this.comments = response.data.reverse();
        } catch(e) {
          alert('Error')
        }
      },

      async createComment(comment) {
          this.dialogVisible = false;
          await fetch('http://194.67.93.117:80/comments', {
            method: "post",
            headers: {
              'Username' : 'Alexanderbr1',
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
      },


      initializeSSE() {
        this.eventSource = new EventSource('http://194.67.93.117:80/comments/stream');

        this.eventSource.addEventListener('message', (event) => {
          const comment = JSON.parse(event.data);
          this.comments.push(comment);
          console.log(comment)
          console.log(this.comments)
        });

      },

      closeSSE() {
        this.eventSource.close();
        this.eventSource = null;
      },

    },
    computed: {
      rootComments() {
        const commentsById = {};
        const rootComments = [];

        for (const comment of this.comments) {
          const commentCopy = { ...comment, children: [] };
          commentsById[comment.id] = commentCopy;
        }

        for (const comment of this.comments) {
          const parentComment = commentsById[comment.parentId];
          if (parentComment) {
            parentComment.children.push(commentsById[comment.id])
          } else {
            rootComments.push(commentsById[comment.id])
          }
        }

        return rootComments
      }
    },
    mounted() {
      this.fetchComments();
      this.initializeSSE();
    }
  }
</script>

<style scoped>
  .comments__title {
    text-align: center;
  }

  .comments__switch {
    margin: 0 auto;
    max-width: fit-content;
  }

  .switch__label {
    font-size: 20px;
    font-weight: 500;
  }
  .comments__create-btn {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
</style>
