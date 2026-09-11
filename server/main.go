package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

type HealthResponse struct {
	Status  string    `json:"status"`
	Message string    `json:"message"`
	DBTime  time.Time `json:"dbTime"`
}

func main() {
	// 修正前
	// connStr := "host=localhost port=5433 user=user password=password dbname=learning_db sslmode=disable"

	// 修正後（localhost を 127.0.0.1 に変更！）
	connStr := "host=127.0.0.1 port=5436user=user password=password dbname=learning_db sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("DB設定エラー:", err)
	}
	defer db.Close()

	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		var dbTime time.Time
		err := db.QueryRow("SELECT NOW()").Scan(&dbTime)
		if err != nil {
			// ★ ターミナルに詳しいエラー内容を出力します
			log.Println("【DB接続エラー詳細】:", err)

			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{
				"status":  "error",
				"message": "DB接続失敗",
			})
			return
		}

		response := HealthResponse{
			Status:  "ok",
			Message: "Go API サーバー及び PostgreSQL への接続に成功しました！",
			DBTime:  dbTime,
		}

		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Go サーバーを起動しました: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
