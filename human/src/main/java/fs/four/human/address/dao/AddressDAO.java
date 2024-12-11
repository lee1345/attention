package fs.four.human.address.dao;

import fs.four.human.address.vo.AddressVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AddressDAO {

    // 특정 사용자의 주소록 데이터 조회
    List<AddressVO> getAddressByEmployeeId(
            @Param("employeeId") String employeeId);

    // 특정 사용자의 검색 데이터 조회
    List<AddressVO> searchAddressByEmployeeId(
            @Param("employeeId") String employeeId,
            @Param("category") String category,
            @Param("query") String query);

    // 특정 공지사항 조회
    AddressVO getAddressById(int id);

    // 새로운 주소 데이터 등록
    void createAddress(AddressVO address);

    // 주소 데이터 수정
    void updateAddress(AddressVO address);

    // 주소 데이터 삭제
    void deleteAddress(int id);

}
