package com.ssafy.db.repository;

import com.ssafy.db.entity.Quest.Quest;
import com.ssafy.db.entity.Quest.QuestUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Primary
@RequiredArgsConstructor
public class QuestRepositotySupport implements QuestRepository {

    private final EntityManager em;

    // create, update
    @Override
    public void saveQuest(Quest quest) { em.persist(quest); }
    @Override
    public void saveQuestUser(QuestUser questUser) { em.persist(questUser); }

    // read
    @Override
    public Quest findById(Long quest_id) {
        return em.find(Quest.class, quest_id);
    }

    // quest_id 받아오기
    @Override
    public Long questId() {
        Quest quest = new Quest();
        return quest.getQuest_id();
    }

    @Override
    public QuestUser findQuestUserById(Long questUser_id) {
        return em.find(QuestUser.class, questUser_id);
    }

    @Override
    public List<QuestUser> questUserList(String nickname) {
        return em.createQuery("select qu from QuestUser qu where qu.nickname=:nickname", QuestUser.class)
                .setParameter("nickname", nickname)
                .getResultList();
    }
}
