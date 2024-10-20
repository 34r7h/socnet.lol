// src/store.js
import { defineStore } from "pinia";

// Define a store with only state
export const useMainStore = defineStore("main", {
  state: () => ({
    // Your state variables
    user: null,
    chats: {}
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
  },
});
