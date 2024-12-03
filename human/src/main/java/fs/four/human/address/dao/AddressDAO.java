package fs.four.human.address.dao;

import fs.four.human.address.vo.AddressVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressDAO {

    List<AddressVO> getAllAddress();

}
