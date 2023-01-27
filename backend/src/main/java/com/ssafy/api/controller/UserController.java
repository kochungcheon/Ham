package com.ssafy.api.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.ssafy.api.request.UserNicknameRequest;
import com.ssafy.api.request.UserRegisterRequest;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User.User;
import com.ssafy.db.entity.User.UserProfile;
import com.ssafy.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api(value = "user API", tags = {"User"})
@RestController
//임시 주소...
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    UserService userService;

    UserRepository userRepo;

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "필요한 정보를 전부 입력한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    /* User-가입 API: 가입한 사용자의 PK를 리턴해준다 */
    public String registerUser(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterRequest registerInfo) {
        Long user_id = userService.registerUser(registerInfo);
        return user_id + " OK";
    }

    @PutMapping()
    @ApiOperation(value = "닉네임 등록", notes = "닉네임을 입력해주세요")
    @ApiImplicitParam(name = "유저 닉네임", value = "hamburger")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    /* UserProfile-닉네임 등록 API: (프롤로그시 최초1회 실행) */
    public String registerNickname(
            @RequestBody @ApiParam(value="닉네임 등록", required = true) String nickname, Long user_id) {
        String getNickname = userService.registerNickname(user_id, nickname);
        return user_id + " : " + getNickname + " OK";
    }

//    @GetMapping("/my/{email}")
//    @ApiOperation(value = "회원 정보 조회", notes = "로그인한 회원의 프로필 정보 조회")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<UserRes> getUserInfo(@PathVariable String email) {
//        UserProfile user = userService.loginUserData(email);
//        return null;
//    }

    /* 수정할 정보 없어서 미사용 */
//    @PutMapping()
//    @ApiOperation(value = "회원 정보 업데이트", notes = "조회한 정보 업데이트")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<? extends BaseResponseBody> updateUser() {}

//    @DeleteMapping
    // 체크할 것
    // 1 User를 삭제했을때 연결된 UserProfile도 삭제되는가?
    // 2 삭제된다면 RemoveUserProfile을 별도로 두지 않는다
    // 3 삭제되지 않고, 오류가 발생하지 않는다면 remove로 별도실행해준다
    // 4 참조 오류가 발생...하지는 않을 것 같다 Profile에서 조회하는게 아니니깐...

}
