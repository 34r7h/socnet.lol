// src/store.js
import { defineStore } from "pinia";

// Define a store with only state
export const useMainStore = defineStore("main", {
  state: () => ({
    // Your state variables
    user: null,
    chats: {},
    posts: {},
    prompts: {
        consume: 'you are interacting with a social network of npcs. you will be provided a persona: [personality, bio, ,mood]. Based on the persona traits, you will estimate the likelihood of interaction with the content of a post. interactions include like, reply, or follow. Your output should be only a json object in the following template: ["like": t/f, "reply": if true, text of reply, "follow":t/f]. Here comes the persona, followed with content of the post.. ',
        post: 'Write a post about a topic that would be aligned given the following persona attributes and mood: '
    }
  }),
  actions: {
    async hash(input) {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash as ArrayBuffer

      // Convert ArrayBuffer to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      return hashHex; // Return the SHA-256 hash as a hexadecimal string
    },
    async chat(prompt) {
        try {
            const response = await fetch(
              "http://" + window.location.hostname + ":" + 3000 + "/api/chat",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt, model: 'dolphin-llama3' }),
              }
            );
    
            const data = await response.json();
            console.log("Chats", data);
            this.chats[await this.hash(prompt)] = data.response.split('\n').slice(0,-1).map(x=>(console.log(x), JSON.parse(x).response || '')).join('')
            return data;
          } catch (error) {
            console.error("Error during chat:", error);
          }
    },
    async createbot({name, avatar, bio, personality, feed, budget, creator}){
        console.log({name, avatar, bio, personality, feed, budget, creator});
        try {
            const response = await fetch(
              "http://" + window.location.hostname + ":" + 3000 + "/api/createbot",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify( {name, avatar, bio, personality, feed, budget, creator} ),
              }
            );
    
            const data = await response.json();
            console.log("Bot creation successful", data);
            this.bot = data.bot;
            return data;
          } catch (error) {
            console.error("Error during signup:", error);
          }
        
    },
    async signup({ email, password }) {
      console.log("signing up new user", { email, password, passwordhash: await this.hash(password) });
      const passhash = await this.hash(password)
      try {
        const response = await fetch(
          "http://" + window.location.hostname + ":" + 3000 + "/api/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password: passhash }),
          }
        );

        const data = await response.json();
        console.log("Signup successful", data);
        this.user = data.user;
        return data.user;
      } catch (error) {
        console.error("Error during signup:", error);
      }
    },
    async fetchUser() {
      return { name: "John Doe", age: 30 };
    },
    async getposts(){
        try {
            const response = await fetch(
              "http://" + window.location.hostname + ":" + 3000 + "/api/post",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({'test': 'feedconfig'}),
              }
            );
    
            const data = await response.json();
            console.log("Post creation successful", data);
            this.posts = JSON.parse(data.posts);
            return data;
          } catch (error) {
            console.error("Error during getposts:", error);
          }
    }
  },
});
