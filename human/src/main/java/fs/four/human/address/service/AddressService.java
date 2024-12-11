package fs.four.human.address.service;

import fs.four.human.address.dao.AddressDAO;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressDAO addressDAO;

    // 로그인 사용자의 주소록 데이터 조회
    public List<AddressVO> getAddressByEmployeeId(String employeeId) {
        return addressDAO.getAddressByEmployeeId(employeeId);
    }

    // 로그인 사용자의 검색 데이터 조회
    public List<AddressVO> searchAddressByEmployeeId(String employeeId, String category, String query) {
        return addressDAO.searchAddressByEmployeeId(employeeId, category, query);
    }

    // 특정 주소 조회
    public AddressVO getAddressById(int id) {
        return addressDAO.getAddressById(id);
    }

    // 새로운 주소 데이터 등록
    public void createAddress(AddressVO address) {
        addressDAO.createAddress(address);
    }

    // 주소 수정
    public void updateAddress(AddressVO address) {
        addressDAO.updateAddress(address);
    }

    // 주소 삭제
    public void deleteAddress(int id) {
        addressDAO.deleteAddress(id);
    }
}
