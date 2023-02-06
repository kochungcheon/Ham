package com.ssafy.db.repository;

import com.ssafy.db.entity.Quest.Quest;
//import com.ssafy.db.entity.Quest.QuestRequirement;
import com.ssafy.db.entity.Quest.QuestUser;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestRepository {
    // create, update
    void saveQuest(Quest quest);
    void saveQuestUser(QuestUser questUser);
//    void saveQuestReq(QuestRequirement questReq);

    // Read
    Quest findById(Long quest_id);

    // quest_id 받아오기
    Long questId();


    QuestUser findQuestUserById(Long questUser_id);

    List<QuestUser> questUserList(String nickname);

//    List<Quest> questList();
}
