ALTER TABLE Customer ALTER COLUMN CustomerFullName NVARCHAR(100) NOT NULL;
ALTER TABLE Customer ALTER COLUMN Telephone NVARCHAR(20) NULL;
ALTER TABLE RoomType ALTER COLUMN RoomTypeName NVARCHAR(50) NOT NULL;
ALTER TABLE RoomType ALTER COLUMN TypeDescription NVARCHAR(250) NULL;
ALTER TABLE RoomType ALTER COLUMN TypeNote NVARCHAR(250) NULL;
ALTER TABLE RoomInformation ALTER COLUMN RoomDetailDescription NVARCHAR(500) NULL;

UPDATE Customer SET CustomerFullName = N'Nguyễn Văn An' WHERE EmailAddress = 'customer@fuminihotel.com';
UPDATE Customer SET CustomerFullName = N'Trần Thị Mai' WHERE EmailAddress = 'mai.tran@gmail.com';
UPDATE Customer SET CustomerFullName = N'Lê Hoàng Nam' WHERE EmailAddress = 'nam.le@yahoo.com';

UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Standard 1 giường đôi, tiện nghi' WHERE RoomNumber = '101';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Standard 2 giường đơn, thoáng mát' WHERE RoomNumber = '102';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Deluxe King bed, bồn tắm nằm cao cấp' WHERE RoomNumber = '201';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Deluxe view công viên, ban công rộng' WHERE RoomNumber = '202';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng VIP minibar miễn phí, dịch vụ cao cấp' WHERE RoomNumber = '301';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Family Suite gia đình ấm cúng' WHERE RoomNumber = '401';
UPDATE RoomInformation SET RoomDetailDescription = N'Phòng Family Suite 2 phòng ngủ riêng biệt' WHERE RoomNumber = '402';

UPDATE RoomType SET TypeDescription = N'Phòng tiêu chuẩn tiện nghi cơ bản', TypeNote = N'Tầng 1-2' WHERE RoomTypeName = 'Standard';
UPDATE RoomType SET TypeDescription = N'Phòng cao cấp view thành phố', TypeNote = N'Tầng 3-4' WHERE RoomTypeName = 'Deluxe';
UPDATE RoomType SET TypeDescription = N'Phòng Suite có phòng khách riêng', TypeNote = N'Tầng 5' WHERE RoomTypeName = 'Executive Suite';
UPDATE RoomType SET TypeDescription = N'Phòng gia đình 2 giường đôi', TypeNote = N'Tầng 2-3' WHERE RoomTypeName = 'Family Suite';
