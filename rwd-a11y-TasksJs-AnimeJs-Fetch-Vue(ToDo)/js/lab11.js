const app = {
    data() {
      return {
        newRecord: '',
        records: [],
      }
    },

    computed: {
      countCharacters() {
        const maxLength = 50;
        return maxLength - this.newRecord.length;
      },

      countRecords() {
        return this.records.length;
      }
    },

    methods: {
      addRecord() {
        const newId = Date.now();
        const newTimestamp = new Intl.DateTimeFormat('ru', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }).format(newId);
        const newRecord = {
          id: newId,
          text: this.newRecord,
          timestamp: newTimestamp
        };
        this.records.push(newRecord);
        this.newRecord = '';
      }
    },
}
const todo = Vue.createApp(app)
todo.mount('#app');