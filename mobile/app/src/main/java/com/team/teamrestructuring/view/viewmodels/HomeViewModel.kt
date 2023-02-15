package com.team.teamrestructuring.view.viewmodels

import android.service.autofill.UserData
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.team.teamrestructuring.dto.PetData
import com.team.teamrestructuring.dto.User
import com.team.teamrestructuring.util.ApplicationClass


class HomeViewModel : ViewModel() {

    private val _petData: MutableLiveData<PetData> = MutableLiveData()
    val petData : LiveData<PetData>
        get() = _petData
    private val _userData:MutableLiveData<User> = MutableLiveData()
    val userData : LiveData<User>
        get() = _userData

    fun updatePet(data:PetData){
        _petData.postValue(data)
    }
    fun updateUser(data:User){
        _userData.postValue(data)
    }


}