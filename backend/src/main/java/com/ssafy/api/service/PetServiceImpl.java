package com.ssafy.api.service;

import com.ssafy.api.request.PetCreateRequest;
import com.ssafy.api.request.PetStatRequest;
import com.ssafy.db.entity.Pet.Pet;
import com.ssafy.db.entity.Pet.PetInfo;
import com.ssafy.db.entity.Pet.PetStat;
import com.ssafy.db.entity.User.UserProfile;
import com.ssafy.db.repository.PetRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {

    @Autowired
    PetRepository petRepo;

    @Autowired
    UserRepository userRepo;

    //수정필요 : Pet 으로 객체생성, FindByPetId로 PetOutfit과 PetStat 생성
    //User도 같은 방법으로 수정해야 하나......
    @Override
    public Pet createPet(PetCreateRequest createInfo) {

        /* 현재 메인페이지에 펫이 있으면 null */
        if(ActivatePet(createInfo.getUser_nickname()) != null) {return null;}

        /* 없다면 펫 생성 */
        Pet pet = new Pet();
        PetInfo petInfo = new PetInfo();
        PetStat petStat = new PetStat();
        UserProfile userProfile = userRepo.findByNickname(createInfo.getUser_nickname());

        //fireBase에서 UserProfile 가져오기
        pet.setNickname(userProfile.getNickname());
        pet.setPet_name(createInfo.getName());
        pet.setLevel(1);
        pet.setExp(0);
        pet.setCreate_date(LocalDate.now());

        petInfo.setPet(pet);
        petStat.setPet(pet);

        petRepo.savePet(pet);
        petRepo.savePetInfo(petInfo);
        petRepo.savePetStat(petStat);

        return pet;
    }
    /* 그냥 펫 정보 조회 - 졸업여부 체크 X */
    @Override
    public Pet petData(Long pet_id) { Pet pet = petRepo.findById(pet_id); return pet; }
    @Override
    public PetInfo petInfoData(Long pet_id) { PetInfo petInfo = petRepo.findInfoById(pet_id); return petInfo; }

    @Override
    public PetStat petStatData(Long pet_id) { PetStat petStat = petRepo.findStatById(pet_id); return petStat; }

    /* 해당 사용자의 졸업하지 않은 펫 */
    @Override
    public Pet ActivatePet(String nickname) {

        /* 현재 메인페이지에 펫이 없으면 null */
        if(petRepo.findByNickname(nickname) == null) {return null;}

        Long pet_id = petRepo.findByNickname(nickname).getPet_id();
        Pet pet = petData(pet_id);

        /* 불러온 펫의 졸업여부 체크 */
        if(pet.is_graduate()) {return null;}

        return pet;
    }

    /* 해당 사용자의 졸업한 펫 리스트 */
    @Override
    public List<PetInfo> graduatedPets(String nickname) {
        /* 졸업여부 체크 repo에서 수행됨 */
        List<PetInfo> pets = petRepo.graduatePetList(nickname);
        return pets;
    }


    @Override
    public Pet expLevelLogic(Long pet_id, int exp) {
        Pet pet = petRepo.findById(pet_id);

        /* 졸업여부 체크 */
        if(pet.is_graduate() == true) {return null;}

        int nowExp = pet.getExp();
        int nowLevel = pet.getLevel();

        int newExp = nowExp + exp;
        int newLevel = nowLevel;

        switch (newLevel) {
            case 1: if(newExp >= 14) {newLevel++; newExp -= 14;} break;
            case 2: if(newExp >= 30) {newLevel++; newExp -= 30;} break;
            case 3: if(newExp >= 60) {newLevel++; newExp -= 60;} break;
            case 4: if(newExp >= 66) {newLevel++; newExp -= 66;} break;
            case 5: newExp = 0; break;
        }

        pet.setExp(newExp);
        pet.setLevel(newLevel);

        return pet;
    }

    @Override
    public PetInfo typeSettingLogic(PetStat petStat) {
        return null;
    }

    @Override
    public PetStat statLogic(PetStatRequest petStatRequest) {
        Pet pet = petRepo.findById(petStatRequest.getPet_id());
        PetStat petStat = petRepo.findStatById(petStatRequest.getPet_id());

        /* 졸업여부 체크 */
        if(pet.is_graduate()) return null;

        petStat.setPhysical(petStat.getPhysical() + petStatRequest.getPhysical());
        petStat.setArtistic(petStat.getArtistic() + petStatRequest.getArtistic());
        petStat.setIntelligent(petStat.getIntelligent() + petStatRequest.getIntelligent());
        petStat.setInactive(petStat.getInactive() + petStatRequest.getInactive());
        petStat.setEnergetic(petStat.getEnergetic() + petStatRequest.getEnergetic());
        petStat.setEtc(petStat.getEtc() + petStatRequest.getEtc());

        petRepo.savePetStat(petStat);
        return petStat;
    }

    @Override
    public Pet graduate(Long pet_id) {
        Pet pet = petRepo.findById(pet_id);

        /* 졸업가능여부 체크 : 레벨 5미만이거나 졸업했으면 null 리턴 */
        if(pet.getLevel() < 5 || pet.is_graduate()) { return null; }

        pet.setGraduate_date(LocalDate.now());
        pet.set_graduate(true);

        petRepo.savePet(pet);
        return pet;
    }


}
