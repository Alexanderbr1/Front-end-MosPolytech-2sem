<template>
    <form class="form"  @submit.prevent="createComment">
        <label class="form__label">
            Author
            <input class="form__input" type="text" v-model="comment.author" name="author" placeholder="author" required>
        </label>
        <label class="form__label">
            Text
            <input class="form__input" type="text" v-model="comment.text" name="text" placeholder="text" required>
        </label>
        <select class="form__select" name="reaction" v-model="comment.reaction" required>
            <option disabled>Выбери реакцию</option>
            <option value="1">👍</option>
            <option value="0" selected>🗿</option>
            <option value="-1">👎</option>
        </select>
        <my-button :disabled="isSubmitDisabled" class="form__btn" type="sumbit">Создать</my-button>
    </form>
</template>
<script>
import MyButton from './UI/MyButton.vue';

export default {
    data() {
        return {
            comment: {
                author: '',
                text: '',
                reaction: '',
            }
        }
    },
    components: {MyButton},
    methods: {
        createComment() {
            this.$emit('create', this.comment);
            this.comment.author = '';
            this.comment.text = '';
        }
    },
    computed: {
    isSubmitDisabled() {
      return !(this.comment.author && this.comment.text && this.comment.reaction);
    }
  },
}
</script>
<style scoped>

    .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .form__label {
        display: flex;
        flex-direction: column;
        font-size: 20px;
    }
</style>