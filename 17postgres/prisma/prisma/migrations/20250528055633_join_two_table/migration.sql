-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
